Code for local-mode.  This will not be loaded under meteor.

    {
      OrgData,
      bindDisplayStructure,
      installSelectionMenu,
    } = Leisure

    $(document).ready ->
      installSelectionMenu()
      window.DATA = data = new OrgData()
      structure = $("<div class='structure'></div>")
      $(document.body).append structure
      bindDisplayStructure data, structure
      window.ED = Leisure.plainEditDiv $("[maindoc]"), data
      ED.options.load 'fred\n'
