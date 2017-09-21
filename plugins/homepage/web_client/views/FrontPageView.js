import _ from 'underscore';

import FrontPageView from 'girder/views/body/FrontPageView';
import { renderMarkdown } from 'girder/misc';
import { restRequest } from 'girder/rest';
import { wrap } from 'girder/utilities/PluginUtils';

wrap(FrontPageView, 'render', function (render) {
    restRequest({
        method: 'GET',
        url: 'homepage/markdown'
    }).done((resp) => {
        if (!resp['homepage.markdown']) {
            render.call(this);
            if (resp['homepage.header']) {
                this.$('.g-frontpage-title').text(resp['homepage.header']);
            }
            if (resp['homepage.subheading_text']) {
                this.$('.g-frontpage-subtitle').text(resp['homepage.subheader']);
            }
            if (resp['homepage.welcome_text']) {
                this.$('.g-frontpage-welcome-text-content').html(renderMarkdown(resp['homepage.welcome_text']));
            }
            if (resp['homepage.logo']) {
                this.$('.g-frontpage-logo').attr('src', resp['homepage.logo']);
            }
        } else {
            this.$el.html(renderMarkdown(resp['homepage.markdown']));
        }
    });

    return this;
});
