# Leisure environment

# Codebases

A codebase is a collection of documents with

* Function definitions
* Automatic expressions that run on load
* Test cases
* Rich documentation

If you query definitions, you can edit them directly in the results and they will change in their "home" documents.

# Storage

* documents are HTML files with "pre" elements containing code
   * Code can contain comments
   * code in "pre" elements can float in "normal" HTML
   * inactive code shows a collapsed LeisureBar
* in-browser
   * body gets a version ID, stored the HTML file system
   * page gets a directory on the HTML file system
   * code elements each get a file, named with the "leisureName" attribute
      * if no leisureName, one is generated
   * as you make changes, the browser file system stores them and increments the body's version id
   * when you open an HTML file, it does a version check
      * if there is a version conflict, Leisure offers to
	     1. restore the old version
		 2. use the new one, backing up the old
		 3. use the new one and wipe the old
   * file system layout
      * pagename.properties file
         * no-cache -- don't use storage for this page
         * version id
	  * pagename.dir directory
         * file for each code element
   * pages can import other pages
