$(function(){

function renderTemplate(templateId, container, model){
  var templateString = $('#' + templateId).text();
  var templateFunction = _.template(templateString);
  var renderedTemplate = templateFunction(model);
  $(container).append(renderedTemplate);
}

var $blogPostsVar = $('.blogPost');
var $nameVar = $('.nameInput');
var $dateVar = $('.dateInput');
var $blogTitleVar = $('.titleInput');
var $postVar = $('.post');
var $container = $('.blogPostsContainer');


//$.ajax("http://tiny-pizza-server.herokuapp.com/collections/blogPosts2", {type: 'POST'}).done(function)

$.ajax( {
   type: "GET",
   url: "http://tiny-pizza-server.herokuapp.com/collections/blogPosts2",
   success: function(data) {
     _.each(data, function(post) {
       var renderVars = {
         name: post.name,
         date: post.date,
         blogTitle: post.blogTitle,
         blogPost: post.blogPost};
        renderTemplate('blogPostTemplate', '.blogPostsContainer', renderVars);
     });
   },
    error: function() {
      alert('Error Loading Blog Posts');
    }
});

$('.addBlog').on('click', function() {

  var postBlogPush = {
    name: $nameVar.val(),
    date: $dateVar.val(),
    blogTitle: $blogTitleVar.val(),
    blogPost: $postVar.val(),
};

$.ajax( {
   type: "POST",
   url: "http://tiny-pizza-server.herokuapp.com/collections/blogPosts2",
   dataType: 'json',
   data: postBlogPush,
   success: function() {
      renderTemplate('blogPostTemplate', '.blogPostsContainer', postBlogPush);
   },

   error: function() {
     alert('Error Saving New Blog Posts');
      }
    });

$container.delegate('.remove', 'click', function() {
      var idNum = $(this).attr('id');
      console.log(idNum);
  $ajax( {
    type: "DELETE",
    url: "http://tiny-pizza-server.herokuapp.com/collections/blogPosts2"+idNum
  });
});

  });
});
