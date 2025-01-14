const { List } = window;
$(() => {
  // Find tables with rows with data-link attribute, then make them clickable
  $('tr[data-link]').on('click', (e) => {
    // skip if a button was clicked (used for other actions)
    if (e.target.tagName === 'BUTTON') return;

    const loc = e.currentTarget.dataset.link;
    if (e.metaKey || (window.navigator.platform.toLowerCase().indexOf('win') !== -1 && e.ctrlKey)) {
      window.open(loc, '_blank');
    } else {
      window.location = loc;
    }
    return false;
  });

  // Course sorting
  // only sort if there are tables to sort
  let courseList;
  if ($('#courses table').length) {
    courseList = new List('courses', {
      page: 500,
      valueNames: [
        'title', 'school', 'revisions', 'characters', 'references', 'average-words', 'views',
        'reviewed', 'students', 'creation-date', 'ungreeted', 'untrained'
      ]
    });
  }

  // Course Results sorting
  // only sort if there are tables to sort
  let courseResultList;
  if ($('#course_results table').length) {
    courseResultList = new List('course_results', {
      page: 500,
      valueNames: [
        'title', 'school', 'revisions', 'characters', 'references', 'average-words', 'views',
        'reviewed', 'students', 'creation-date', 'ungreeted', 'untrained'
      ]
    });
  }

  // Campaign sorting
  // only sort if there are tables to sort
  let campaignList;
  if ($('#campaigns table').length) {
    campaignList = new List('campaigns', {
      page: 500,
      valueNames: [
        'title', 'num-courses', 'articles-created', 'articles-edited', 'characters', 'references', 'views', 'students', 'creation-date'
      ]
    });
  }

  // Article sorting
  // only sort if there are tables to sort
  let articlesList;
  if ($('#campaign-articles table').length) {
    articlesList = new List('campaign-articles', {
      page: 10000,
      valueNames: [
        'title', 'views', 'char_added', 'references', 'lang_project', 'course_title'
      ]
    });
  }

  // Student sorting
  // only sort if there are tables to sort
  let studentsList;
  if ($('#users table').length) {
    studentsList = new List('users', {
      page: 10000,
      valueNames: [
        'username', 'revision-count', 'title'
      ]
    });
  }

  // for use on campaign/programs page
  $('.remove-course').on('click', (e) => {
    const confirmed = window.confirm(I18n.t('campaign.confirm_course_removal', {
      title: e.target.dataset.title,
      campaign_title: e.target.dataset.campaignTitle
    }));
    if (!confirmed) {
      e.preventDefault();
    }
  });

  return $('select.sorts').on('change', function () {
    const list = (() => {
      switch ($(this).attr('rel')) {
        case 'courses': return courseList;
        case 'course_results': return courseResultList;
        case 'campaigns': return campaignList;
        case 'campaign-articles': return articlesList;
        case 'users': return studentsList;
        default: break;
      }
})();
    if (list) {
      return list.sort($(this).val(), {
        order: $(this).children('option:selected').attr('rel')
      });
    }
  });
});
