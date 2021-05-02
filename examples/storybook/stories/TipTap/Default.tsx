/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import cx from 'classnames';
import { Page } from '../Components/StoryParts';
import { TipTapEditor } from 'tip-tap-editor';


export default () => {
    return (
        <Page title="Default Editor">
            <div>
                <TipTapEditor />
            </div>
        </Page>
    );
};


