# Coffeescript mods

To generate named functions, changed
> if (this.ctor) code += ' ' + this.name;

To:
> if (this.name !== undefined || this.ctor) code += ' ' + this.name;
