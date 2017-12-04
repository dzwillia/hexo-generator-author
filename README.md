# hexo-generator-author

Author generator for [Hexo](https://hexo.io/).

## Installation

``` bash
$ npm install hexo-generator-author2 --save
```

## Usage

Add `author` in front matter.

``` yaml
author: John Smith
```

An `author` attribute will be provided in the `post` variable and an `authors` attribute will be provided in the `site` variable.

Hyphenated slugs will be created for each author. For the author "John Smith", the slug that will be created will be `john-smith`, which will be appended to the relative path specified in **config.yml**. In the case where the `author_generator` path is `authors/`, the full relative path for the author "John Smith" would be `/authors/john-smith`.

## Helpers

- `author_to_url(author)`: This helper function can be called with the author's name as the first parameter and will return the full relative path to the author's list of posts.
- `list_authors()`: This helper function outputs a basic list of authors as an unordered list.

## Options

``` yaml
author_generator:
  path: 'authors/'
  per_page: 10
  order_by: -date
```

- **path**: Root path for your author pages. (default = 'authors/')
- **per_page**: Posts displayed per page. (0 = disable pagination)
- **order_by**: Posts order. (Order by date descending by default)

## License

MIT
