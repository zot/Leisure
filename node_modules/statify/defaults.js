var defaults = {
    port: 8000,
    dir: '',
    cache: true,
    list: false
};

var args_map = {
    '-p': 'port',
    '-c': 'cache',
    '-d': 'dir',
    '-l': 'list',
    '-h': 'help',
    '--help': 'help'
};

var transformArgs = function(args)
{
    var i, args_transformed = {};

    for (i in args_map)
    {
        if (args_map.hasOwnProperty(i) && (i in args))
        {
            args_transformed[args_map[i]] = args[i];
        }
    }

    return args_transformed;
};

var mergeDefaults = function(args)
{
    var i;

    for (i in defaults)
    {
        if (defaults.hasOwnProperty(i) && !(i in args))
        {
            args[i] = defaults[i];
        }
    }

    return args;
};

module.exports = function(args)
{
    return mergeDefaults(transformArgs(args));
};
