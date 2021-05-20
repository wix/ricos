/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import cx from 'classnames';
import { Page } from '../Components/StoryParts';
import { TipTapEditor } from 'tip-tap-editor';
import ViewerWrapper from '../Components/ViewerWrapper';
import './TipTapEditor.scss';
import { ensureDraftContent, toDraft } from 'ricos-content/dist/lib/migrateSchema';
import theme from '../../../main/shared/theme/theme';


export default () => {

    const [draftContent, setDraftContent] = useState(null);

    return (
        <Page title="Default Editor">
            <div style={{ display: 'flex' }}>
                <div style={{ border: 'solid 1px red', width: '50%' }}>
                   
                </div>
                <div style={{ border: 'solid 1px red', width: '50%' }}>
                    <ViewerWrapper content={draftContent} theme={{ ...theme }} />
                </div>
            </div>
        </Page>
    );
};



