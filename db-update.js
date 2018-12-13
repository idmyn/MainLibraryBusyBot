const fs = require('fs')
const request = require('request')

/*
This program checks for a library.json
*/

request.get('https://lac-edwebtools.is.ed.ac.uk/discovered/occupy/MainLibrary.json',
  function (error, response, body) {
    if (!error && response.statusCode == 200) {

      fs.readFile('library.json', 'utf8', function readFileCallback(err, old){

        // import existing JSON data (or start from scratch)
        let old_obj = {}
        if (err){
          console.log("No existing 'library.json' found. " +
                      "I'll create a new one for you...")
          old_obj = {'data': []}
        } else {
          old_obj = JSON.parse(old)
        }

        const old_data = old_obj.data[0]

        // import uni data from web
        const uni = JSON.parse(body)

        // percent isn't always in the same place in uni JSON
        let i = 0
        while (uni.states[i].percent === undefined && i < 4){
          i++
        }

        const time = uni.time
        const percent = uni.states[i].percent

        // set up ISO standard yyyy-mm-dd
        let today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth()+1
        const yyyy = today.getFullYear()
        if(dd<10) {
          dd = '0'+dd
        }
        if(mm<10) {
          mm = '0'+mm
        }
        today = yyyy + '-' + mm + '-' + dd

        const new_data = {
          'date': today,
          'time': time,
          'percent': percent
        }

        console.log('old:' + JSON.stringify(old_data))
        console.log('new:' + JSON.stringify(new_data))

        // check if the 'new' data is actually new, and write to file if it is
        if (JSON.stringify(new_data) !== JSON.stringify(old_data)) {
          console.log("I'll update the JSON!")
          let new_obj = old_obj
          new_obj.data.unshift(new_data)
          const json = JSON.stringify(new_obj)
          fs.writeFile('library.json', json, 'utf8', function(err) {
            if (err) throw err
          })
          console.log('wrote:' + JSON.stringify(new_obj))

        } else {
          console.log('No new data to write.')
        }

      })
    } else {console.log('timeout')}
  }
)
