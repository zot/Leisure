Code for local-mode.  This will not be loaded under meteor.

    {
      OrgData
      createStructureDisplay
      createEditorDisplay
      installSelectionMenu
    } = Leisure

    $(document).ready ->
      installSelectionMenu()
      window.DATA = data = new OrgData()
      createStructureDisplay data
      window.ED = Leisure.plainEditDiv $("[maindoc]"), data
      createEditorDisplay ED
      ED.options.load """
      #+BEGIN_SRC js :results dynamic
      3+4
      #+END_SRC
      #+RESULTS:
      : 7
      """ + '\n'
