Code for local-mode.  This will not be loaded under meteor.

    require ['cs!editorSupport.litcoffee', 'cs!diag.litcoffee'], (EditorSupport, Diag)->

      {
        OrgData
        installSelectionMenu
        plainEditDiv
      } = EditorSupport
      {
        createStructureDisplay
        createEditorDisplay
      } = Diag

      $(document).ready ->
        installSelectionMenu()
        window.DATA = data = new OrgData()
        createStructureDisplay data
        window.ED = plainEditDiv $("[maindoc]"), data
        createEditorDisplay ED
        ED.options.load """
        #+BEGIN_SRC js :results dynamic
        3+4
        #+END_SRC
        #+RESULTS:
        : 7
        """ + '\n'
