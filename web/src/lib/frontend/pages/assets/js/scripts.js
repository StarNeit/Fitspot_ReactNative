// Add CSS Styles to Radio Buttons in Form

$("input[type='radio'].trainer").click(function() {
  $("label.trainerL").removeClass("active");
  if ($(this).is(":checked")) { $(this).parent().addClass("active"); }
});

$("input[type='radio'].gender").click(function() {
  $("label.genderL").removeClass("active");
  if ($(this).is(":checked")) { $(this).parent().addClass("active"); }
});

$("input[type='radio'].location").click(function() {
  $("label.locationL").removeClass("active");
  if ($(this).is(":checked")) { $(this).parent().addClass("active"); }
});

$("input[type='radio'].location2").click(function() {
  $("label.location2L").removeClass("active");
  if ($(this).is(":checked")) { $(this).parent().addClass("active"); }
});