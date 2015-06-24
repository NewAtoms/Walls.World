var fileSystem = require('fs')
var marked = require('marked')
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
})
var markdownExtra = require('markdown-extra')

var pagesObject = module.exports = function (callback) {
  var fileDirecory = './pages/'
  var resultObject = { results: [] }

  fileSystem.readdir(fileDirecory, function (fileSystemError, files) {
    if (fileSystemError) throw fileSystemError
    var fileIndex = 0
    files.forEach(function (file) {
      fileIndex++
      fileSystem.readFile(fileDirecory + file, 'utf-8', function (fileSystemError, markdown) {
        if (fileSystemError) throw fileSystemError

        var page = {}
        page.title = markdownExtra.heading(markdown)
        page.name = file.replace(/\.md/g, '')

        page.metadata = markdownExtra.metadata(markdown, function (string) {
          var result = {}
          string = '{ "' + string
          string = string.replace(/\n/g, '", "')
          string = string.replace(/: /g, '": "')
          string = string + '" }'

          try { result = JSON.parse(string) } catch (err) { console.error(page.title, err) }
          finally { return result }
        })

        var markdownWithoutMetadata = markdown.replace(/<!--[\s\S]*?-->\n\n/g, '')
        page.markdown = markdownWithoutMetadata
        page.html = marked(markdownWithoutMetadata)

        resultObject.results.push(page)

        if (--fileIndex === 0) {
          return callback(resultObject)
        }
      })
    })
  })

}
