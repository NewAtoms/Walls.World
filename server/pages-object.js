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

var pagesObject = module.exports = function (pagesObjectCallback) {
  var fileDirecory = './pages/'
  var resultObject = {
    results: [],
    geoJson: {
      type: 'FeatureCollection',
      features: []
    }
  }

  parseFiles(function () {parseGeoJson(function () {done()})})

  function parseFiles (parseFilesCallback) {
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
            return parseFilesCallback(resultObject)
          }
        })
      })
    })
  }

  function parseGeoJson (parseGeoJsonCallback) {
    var features = resultObject.geoJson.features
    resultObject.results.forEach(function (page) {
      if (page.metadata['North Latitude'] && page.metadata['South Latitude'] && page.metadata['East Longitude'] && page.metadata['West Longitude'] && page.name !== 'home') {
        var singleFeature =
        { 'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [
              [
                [page.metadata['East Longitude'], page.metadata['South Latitude']],
                [page.metadata['West Longitude'], page.metadata['South Latitude']],
                [page.metadata['West Longitude'], page.metadata['North Latitude']],
                [page.metadata['East Longitude'], page.metadata['North Latitude']]
              ]
            ]
          },
          'properties': page
        }
        features.push(singleFeature)
      }
    })

    parseGeoJsonCallback(resultObject)
  }

  function done () {
    pagesObjectCallback(resultObject)
  }

}
