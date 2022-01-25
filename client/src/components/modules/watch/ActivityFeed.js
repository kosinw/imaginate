import React from "react";
import { Link } from "@reach/router";
import useSWR from "swr";
import produce from "immer";
import dayjs from "../../../lib/utils/day";

import Identicon from "../Identicon";

const ActivityFeedItem = ({ id, name, time, from, title, fromTitle, animationId }) => {
  const profileURL = `/profile/${id}`;
  const timeAgo = dayjs(time).fromNow(true);

  return (
    <div className="ActivityFeedItem">
      <div className="ActivityFeedItem__section ActivityFeedItem__section--left">
        <Link to={profileURL}>
          <Identicon className="ActivityFeedItem__icon" value={id} size={40} />
        </Link>
      </div>
      <div className="ActivityFeedItem__section ActivityFeedItem__section--right">
        <div className="ActivityFeedItem__header">
          <h3 className="ActivityFeedItem__author">
            <Link to={profileURL}>
              {name}
            </Link>
          </h3>
          <span className="ActivityFeedItem__time">{timeAgo}</span>
        </div>
        <div className="ActivityFeedItem__description">
          {!!from ?
            <p className="ActivityFeedItem__text">
              Forked <Link to={`/watch/${animationId}`} className="ActivityFeedItem__link">"{title}"</Link> from{" "}
              <Link to={profileURL} className="ActivityFeedItem__link">
                {from}'s
              </Link>
              {" "}"{fromTitle}"
            </p> :
            <p className="ActivityFeedItem__text">
              Created <Link className="ActivityFeedItem__link" to={`/watch/${animationId}`}>"{title}"</Link>
            </p>
          }
        </div>
      </div>
    </div>
  );
}

const ActivityFeed = ({ animationId }) => {
  const { data: history } = useSWR(animationId && `/api/animations/${animationId}/history`);

  const construct = produce(draft => {
    for (let i = 0; i < draft.length - 1; ++i) {
      const next = draft[i + 1];
      draft[i] = { ...draft[i], from: next.name, fromTitle: next.title };
    }
  });

  return history ? (
    <div className="ActivityFeed">
      {construct(history).map(item => <ActivityFeedItem key={item.id + item.title + item.name} {...item} />)}
    </div>
  ) : <></>;
};

export default ActivityFeed;