/** START: Layout Functions **/
function buildControls($accordion) {
  $.each(sections, function(key, value) {
    buildSectionLayout(key, value, $("#controls"));
  });
}

function buildSectionLayout(key, section, $parent = null) {
  var $sectionHeading = null,
    $sectionGroup = null,
    $sectionRow = null,
    headingID = key + "Heading",
    groupID = key + "Group",
    groupSelector = "#" + groupID,
    parentSelector = "#" + $parent.attr("id");

  if ($parent === null) $parent = $(this);

  if (typeof key === "string"
    && section !== null && typeof section === "object") {

    $sectionHeading = $("<button></button>").appendTo($parent)
      .addClass("btn btn-block text-left btn-secondary mb-2 control-heading")
      .attr("id", headingID)
      .attr("data-section", key)
      .attr("data-toggle", "collapse")
      .attr("data-target", groupSelector)
      .attr("aria-expanded", "false")
      .attr("aria-controls", groupID)
      .text(section.label);

    $sectionGroup = $("<div></div>").insertAfter($sectionHeading)
      .addClass("collapse control-section")
      .attr("id", groupID)
      .attr("aria-labelledby", headingID)
      .attr("data-parent", parentSelector)
      .attr("data-section", key);

    $('#faceGroup').addClass("show");

    $sectionRow = $("<div></div>").appendTo($sectionGroup)
      .addClass("row");

    $.each(section.options, function(key, value) {
      buildOptionLayout(key, value, $sectionRow);
    });
  }
}

function buildOptionLayout(key, option, $parent = null) {
  var $optionCol = null,
    $optionGroup = null,
    $optionLabel = null,
    $optionField = null,
    $optionToggleLabel = null,
    $optionToggleField = null;

  if ($parent === null) $parent = $(this);

  if (typeof key === "string"
    && option !== null && typeof option === "object") {
    $optionCol = $("<div></div>").appendTo($parent)
      .addClass("col-sm-6");
    $optionGroup = $("<div></div>").appendTo($optionCol)
      .addClass("form-group");
    $optionLabel = $("<label></label>").appendTo($optionGroup)
      .attr("for", "select_" + key)
      .text(option.label);
    if (option.hasOwnProperty("hasToggle") && option.hasToggle) {
      $optionToggleLabel = $("<label>Show: </label>").appendTo($optionGroup).addClass("toggle-label");
      $optionToggleField = $("<input>").appendTo($optionToggleLabel)
        .addClass("toggles")
        .attr("type", "checkbox")
        .attr("id", "toggle_" + key)
        .attr("aria-label", "Show")
        .attr("title", "Show")
        .attr("value", "")
        .on('change', buildFace);

      if (option.hasOwnProperty("hides")
        && typeof option.hides === "string"
        && option.hides.length > 0) {
        $optionToggleField.data("hides", option.hides);
      }
    }
    $optionField = $("<input>").appendTo($optionGroup)
      .addClass("slider " + key)
      .attr("id", "select_" + key)
      .attr("type", "range")
      .attr("min", 1)
      .attr("max", option.choices)
      .rangeslider({
        polyfill: false,
        rangeClass: "rangeslider " + key,
        onSlide: function(p, v) {updateSlider(p, v, this)}
      })
      .on('change', changeSlider);
  }
}
/** END: Layout Functions **/