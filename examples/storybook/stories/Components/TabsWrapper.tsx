import React, { Component } from 'react';
import { Table, Tabs } from 'wix-style-react';
import { APIData } from '../Plugins/apiData';
import { Section } from './StoryParts';

export default class TabsWrapper extends Component<
  { apiData: APIData[] },
  { activeId: number | string }
> {
  constructor(props) {
    super(props);
    this.state = {
      activeId: 1,
    };
  }

  getApiTable = () => {
    const { apiData } = this.props;
    return (
      <Section title="Props">
        <Table
          data={apiData}
          columns={[
            { title: 'Name', render: row => row.name },
            { title: 'Type', render: row => row.type },
            { title: 'Default Value', render: row => row.defaultValue },
            { title: 'Required', render: row => row.required },
            { title: 'Description', render: row => row.description },
          ]}
        >
          <Table.Content />
        </Table>
      </Section>
    );
  };

  getComponentToRender = () => {
    const { children } = this.props;
    const { activeId } = this.state;
    return activeId === 1 ? children : this.getApiTable();
  };

  render() {
    const { activeId } = this.state;
    return (
      <div>
        <Tabs
          activeId={activeId}
          onClick={value => this.setState({ activeId: value.id })}
          items={[
            { id: 1, title: 'Description' },
            { id: 2, title: 'API' },
          ]}
        />
        {this.getComponentToRender()}
      </div>
    );
  }
}
