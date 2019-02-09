import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import { Avatar, Icon, Button } from 'antd';
import { compose } from 'redux';
import CommunityAction from 'components/CommunityAction';
import UploadFile from 'components/UploadFile';
import CommunityBreadcrumbs from 'components/CommunityBreadcrumbs';
import Bage from 'components/Bage';
import Tag from 'components/Tag';

import withQueryRenderer from 'hocs/withQueryRenderer';
import withMutation from 'hocs/withMutation';

import './Community.module.css';

const Community = ({ community, viewer, update, relayEnvironment }) => {
  if (!community || !viewer) {
    return <div>Not found</div>;
  }

  const communityProps = {
    data: community,
    update,
    relayEnvironment,
  };

  return (
    <div>
      <CommunityBreadcrumbs items={[{ href: '/catalog', label: 'Сообщества' }]} title={community.name} />
      <div styleName="root">
        <div styleName="cardsLine">
          <CommunityCard {...communityProps} button={<CommunityAction viewer={viewer} data={community} />} />
          <Bages />
          <Categories />
        </div>
        <div styleName="cardsLine">
          <Description />
          <Offers />
        </div>
      </div>
    </div>
  );
};

const CommunityCard = ({ data, button, update, relayEnvironment }) => (
  <div styleName="card infoCard">
    <div styleName="communityHeader">
      <div styleName="communityBackground" style={{ backgroundColor: '#005a9b' }}>
        <span styleName="threeDots">...</span>
      </div>
      <UploadFile onSuccess={update} relayEnvironment={relayEnvironment}>
        <Avatar styleName="avatar" size={100} icon="user" src={data.avatarUrl} />
      </UploadFile>
      <div styleName="communityName">
        <span styleName="name">{data.name}</span>
        {data.shortDescription && <span styleName="description">{data.shortDescription}</span>}
      </div>
    </div>
    <div styleName="communityFooter">
      <div styleName="communityParametres">
        <div styleName="communityParameter">
          <Icon type="message" style={{ fontSize: 20, color: '#c2c2c2' }} />
          <span styleName="parameterText">Чатов - 16</span>
        </div>
        <div styleName="communityParameter">
          <Icon type="user" style={{ fontSize: 20, color: '#c2c2c2' }} />
          <span styleName="parameterText">Подписчиков - 20000</span>
        </div>
        <div styleName="communityParameter">
          <Icon type="medicine-box" style={{ fontSize: 20, color: '#c2c2c2' }} />
          <span styleName="parameterText">Офферов - 34</span>
        </div>
      </div>
      {button}
    </div>
  </div>
);

const Bages = () => (
  <div styleName="card infoCard">
    <div styleName="bagesHeader">
      <span>Награды</span>
      <span styleName="bagesLink">Смотреть все (34)</span>
    </div>
    <div styleName="bagesContent">
      <Bage
        tooltip
        tooltipData={{ title: 'Бриллиант', description: 'Оборот сообщества больше 1 BTC' }}
        bage={<Icon type="radar-chart" style={{ fontSize: 55, color: '#00ffd8' }} />}
      />
      <Bage
        tooltip
        tooltipData={{ title: 'Золотая медаль', description: '10 000 подписчиков в сообществе' }}
        bage={<Icon type="crown" style={{ fontSize: 55, color: '#ffd400' }} />}
      />
      <Bage
        tooltip
        tooltipData={{ title: 'Улыбочка', description: 'Более 90% отзывов - положительные' }}
        bage={<Icon type="smile" style={{ fontSize: 55, color: '#55b25a' }} />}
      />
    </div>
  </div>
);

const Categories = () => (
  <div styleName="card infoCard">
    <div styleName="cardHeader categoriesHeader">
      <span>Категории</span>
      <span>...</span>
    </div>
    <div styleName="categoriesContent">
      <Tag label="tag1" />
      <Tag label="tag2" />
      <Tag label="tag1" />
      <Tag label="tag2" />
      <Tag label="tag1" />
      <Tag label="tag2" />
    </div>
  </div>
);

const Description = () => (
  <div styleName="card">
    <div styleName="cardHeader descriptionHeader">
      <span>Описание сообщества</span>
      <span>...</span>
    </div>
    <div styleName="descriptionContent">
      <span>
        Built for Remote Teams, Large and Small
        <br />
        • get summary reports in Slack (DM/channel), via email or on the web;
        <br />• track business metrics, the team{"'"}s progress and happiness;
        <br />
        • share goals, to do lists, meeting notes, agendas, run polls, brainstorm;
        <br />
        • share permissions with your team using multi-admin access;
        <br />
        <br />
        Think of Standuply as a Scrum Master that works in thousands of teams and applies the best practices. <br />
        Unlike Geekbot, Howdy, Alice, Tatsu and Jack, Standuply covers most of the Agile processes.
        <br />
        As a result, your Agile or Kanban processes run on autopilot, you save time and avoid costly mistakes.
        <br />
        <br />
        Think of Standuply as a Scrum Master that works in thousands of teams and applies the best practices. <br />
        Unlike Geekbot, Howdy, Alice, Tatsu and Jack, Standuply covers most of the Agile processes.
        <br />
        As a result, your Agile or Kanban processes run on autopilot, you save time and avoid costly mistakes.
        <br />
        <br />
        #1 Stand Up Bot for daily async meetings. Trusted by 25,000 teams from Intel, IBM, Adobe and more.
        <br />
        Hot Features : Asynchronous standups & retro meetings | Scheduled surveys | Text, voice & video answers |
        Conditional questions | Integrations | Video calls automation | Multi-admin access | Team Answers Analytics.
        <br />
      </span>
    </div>
    <div styleName="descriptionFooter">
      <button styleName="descriptionButton" type="button">
        Читать полностью
      </button>
    </div>
  </div>
);

const Offers = () => (
  <div styleName="offersCard">
    <div styleName="cardHeader offersHeader">
      <span>Офферы</span>
      <div styleName="offersHeaderOptions">
        <div styleName="offersHeaderOption">
          <Icon styleName="offersHeaderIcon" type="plus" />
          <span>Добавить оффер</span>
        </div>
        <div styleName="offersHeaderOption">
          <Icon styleName="offersHeaderIcon" type="bars" />
          <span>Смотреть все (34)</span>
        </div>
        <div styleName="offersHeaderOption">
          <Icon styleName="offersHeaderIcon" type="setting" />
          <span>Управление панелью</span>
        </div>
      </div>
    </div>
    <div styleName="offerCards">
      {[0, 0, 1, 0].map(i => (
        <div styleName="card offerCard">
          <div styleName="cardHeader offerCardHeader">
            <span>Digital Scrum Master</span>
            <span>...</span>
          </div>
          <div styleName="offerCardContent">
            <span>Think of Standuply as a Scrum Master that works in thousands of teams and applies ...</span>
            <div styleName="offerCardAction">
              <Button type={i === 1 ? 'primary' : 'default'} styleName="offerCardActionChild">
                Связаться
              </Button>
              <div styleName="offerCardActionChild">
                <span styleName="offerCardPrice">0.00634 </span>
                <span styleName="offerCardCurrency">BTC</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div styleName="offerGhost" />
      <div styleName="offerGhost" />
      <div styleName="offerGhost" />
      <div styleName="offerGhost" />
      <div styleName="offerGhost" />
      <div styleName="offerGhost" />
    </div>
    <button type="button" styleName="offersButton">
      <Icon styleName="offersButtonIcon" type="sync" />
      <span>Показать еще</span>
    </button>
  </div>
);

const updateCommunityMutation = graphql`
  mutation CommunityMutation($input: UpdateCommunityInput!) {
    updateCommunity(input: $input) {
      edge {
        node {
          id
          name
          avatarUrl
        }
      }
      errors {
        common
        name
      }
    }
  }
`;

const query = graphql`
  query CommunityQuery($id: ID!) {
    community(id: $id) {
      id
      name
      avatarUrl
      shortDescription
      avatarUrl
      userCount
      ...CommunityAction
    }

    viewer {
      ...CommunityAction_viewer
    }
  }
`;

const enhance = compose(
  withQueryRenderer(query, {
    getVariables: props => ({
      id: props.id,
    }),
  }),
  withMutation('update', (props, input = {}) => ({
    mutation: updateCommunityMutation,
    variables: {
      input: {
        id: props.community.id,
        avatarUrl: input.url,
      },
    },
    optimisticResponse: {
      community: {
        id: props.community.id,
        avatarUrl: input.url,
      },
    },
  }))
);

Community.propTypes = {
  relayEnvironment: PropTypes.object.isRequired,
  update: PropTypes.func,
  community: PropTypes.object,
  viewer: PropTypes.object,
};

CommunityCard.propTypes = {
  relayEnvironment: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  button: PropTypes.node.isRequired,
  update: PropTypes.func,
};

Community.defaultProps = {
  community: null,
  viewer: null,
  update: () => {},
};

CommunityCard.defaultProps = {
  update: () => {},
};

export default enhance(Community);
