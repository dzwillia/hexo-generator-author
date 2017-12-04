# hexo-generator-author

Author generator for [Hexo].

## Installation

``` bash
$ npm install hexo-generator-author --save
```

## Usage

Add `author` in front matter.

``` yaml
author: John Smith
```

You get `author` attribute in `post` variable and `authors` attribute in `site` variable. There is also a helper function `list_authors()`.

## Options

``` yaml
author_generator:
  path: 'authors/'
  per_page: 10
  order_by: -date
  url_map:
    "John Smith": john-smith
    "Kathy Bale": kathy-bale
```

- **path**: Root path for your author pages. (default = 'authors/')
- **per_page**: Posts displayed per page. (0 = disable pagination)
- **order_by**: Posts order. (Order by date descending by default)
- **url_map**: Use different name in url to make it more readable.

## License

MIT
