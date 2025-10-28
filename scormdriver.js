// Basic SCORM 1.2 API wrapper
var scorm = {
    api: null,
    init: function () {
      this.api = this.getAPI();
      if (this.api) this.api.LMSInitialize("");
    },
    getAPI: function () {
      var win = window;
      while (win) {
        if (win.API) return win.API;
        if (win.parent == win) break;
        win = win.parent;
      }
      return null;
    },
    set: function (param, value) {
      if (this.api) this.api.LMSSetValue(param, value);
    },
    get: function (param) {
      return this.api ? this.api.LMSGetValue(param) : "";
    },
    commit: function () {
      if (this.api) this.api.LMSCommit("");
    },
    finish: function () {
      if (this.api) this.api.LMSFinish("");
    }
  };
  
  window.onload = function () {
    scorm.init();
    scorm.set("cmi.core.lesson_status", "incomplete");
  };
  
  window.onbeforeunload = function () {
    scorm.set("cmi.core.lesson_status", "completed");
    scorm.commit();
    scorm.finish();
  };
  