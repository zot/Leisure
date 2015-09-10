// Generated by CoffeeScript 1.9.3
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['immutable', './editor', './editorSupport'], function(immutable, Editor, Support) {
    var DataStore, HamtOrgData, Map, OrgData, getFirst, preserveSelection, setFirst;
    Map = (window.Immutable = immutable).Map;
    DataStore = Editor.DataStore, preserveSelection = Editor.preserveSelection;
    OrgData = Support.OrgData;
    HamtOrgData = (function(superClass) {
      extend(HamtOrgData, superClass);

      function HamtOrgData() {
        HamtOrgData.__super__.constructor.call(this);
        this.blocks = new Map();
      }

      HamtOrgData.prototype.snapshot = function() {
        var data;
        data = new HamtOrgData();
        data.installSnapshot(this);
        return data;
      };

      HamtOrgData.prototype.installSnapshot = function(data) {
        this.blocks = data.blocks;
        this.blockIndex = data.blockIndex;
        return this.namedBlocks = data.namedBlocks;
      };

      HamtOrgData.prototype.getFirst = function() {
        return getFirst(this.blocks);
      };

      HamtOrgData.prototype.setFirst = function(firstId) {
        return this.blocks = setFirst(this.blocks, firstId);
      };

      HamtOrgData.prototype.getBlock = function(id, changes) {
        var ref;
        if (typeof id !== 'string') {
          return id;
        } else {
          return (ref = changes != null ? changes.sets[id] : void 0) != null ? ref : this.blocks.get(id);
        }
      };

      HamtOrgData.prototype.setBlock = function(id, block) {
        return this.makeChanges((function(_this) {
          return function() {
            _this.runFilters(_this.getBlock(id), block);
            _this.blocks = _this.blocks.set(id, block);
            return _this.indexBlock(block);
          };
        })(this));
      };

      HamtOrgData.prototype.deleteBlock = function(id) {
        return this.makeChanges((function(_this) {
          return function() {
            _this.runFilters(_this.getBlock(id), null);
            _this.blocks = _this.blocks["delete"](id);
            return _this.unindexBlock(id);
          };
        })(this));
      };

      HamtOrgData.prototype.load = function(first, newBlocks) {
        return this.makeChanges((function(_this) {
          return function() {
            return HamtOrgData.__super__.load.call(_this, first, setFirst(new Map(newBlocks), first), {
              sets: newBlocks,
              oldBlocks: {},
              first: first
            });
          };
        })(this));
      };

      HamtOrgData.prototype.makeChange = function(change) {
        var ch;
        ch = HamtOrgData.__super__.makeChange.call(this, change);
        ch.origin = change.origin;
        return ch;
      };

      return HamtOrgData;

    })(OrgData);
    getFirst = function(blocks) {
      return blocks.get('FIRST');
    };
    setFirst = function(blocks, firstId) {
      return blocks.set('FIRST', firstId);
    };
    return {
      HamtOrgData: HamtOrgData
    };
  });

}).call(this);

//# sourceMappingURL=hamtData.js.map
