'use strict'

var pagination = require('hexo-pagination')

if (typeof Array.prototype.unique === 'undefined') {
  Array.prototype.unique = function() { return Array.from(new Set(this)) }
}

function author_to_url(author) {
  const config = this.config
  const root = config.root || '/'
  const author_generator = config.author_generator || {}
  const index_generator = config.index_generator || {}
  const base_path = author_generator.path || index_generator.path || 'authors/'
  const author_slug = (author_generator.url_map || {})[author] || author
  return root + base_path + author_slug
}

hexo.extend.filter.register('template_locals', function(locals) {
  if (typeof locals.site.authors === 'undefined') {
    locals.site.authors = locals.site.posts.map(post => post.author).unique()
  }
})

hexo.extend.helper.register('list_authors', function() {
  const count_posts = author => this.site.posts.filter(post => post.author === author).length
  const authors = this.site.authors.map(author => `
    <li class="author-list-item">
      <a class="author-list-link" href="${author_to_url.call(this, author)}">${author}</a>
      <span class="author-list-count">${count_posts(author)}</span>
    </li>`).join('')

  return `<ul class="author-list">${authors}</ul>`
})

hexo.extend.helper.register('author_to_url', function(author) {
  return author_to_url.call(this, author)
})

hexo.extend.generator.register('author', function(locals) {
  const config = this.config
  const author_generator = config.author_generator || {}
  const index_generator = config.index_generator || {}

  const posts = locals.posts
  const authors = posts.map(post => post.author).unique().map(author => ({ name: author, posts: posts.find({author}) }))
  const per_page = author_generator.per_page || index_generator.per_page || config.per_page || 10
  const pagination_dir = config.pagination_dir || 'page'

  return authors.reduce((result, author) => {
    const path = author_to_url.call(this, author.name)
    const posts = author.posts.sort(author_generator.order_by || index_generator.order_by || '-date')

    const data = pagination(path, posts, {
      perPage: per_page,
      layout: ['author', 'archive', 'index'],
      format: pagination_dir + '/%d/',
      data: {
        author: author.name
      }
    })
    return result.concat(data)
  }, [])
})
