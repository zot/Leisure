local json = require('json')

return {stringify = json.encode.encode, parse = json.decode.decode}
