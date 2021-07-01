import React from 'react';
import { Page } from '../Components/StoryParts';
import ExampleApplication from '../Components/ExampleApplication';
import exampleAppContent from '../../../../e2e/tests/fixtures/storybook-tiptap-example-app.json';

export default () => {
    const editorProps = {
        experiments: { tiptapEditor: { value: 'true', enabled: true, namespace: 'ricos' } },
    };
    return (
        <Page title="Example App">
            <ExampleApplication initialState={exampleAppContent} editorProps={editorProps} />
        </Page>
    );
};
