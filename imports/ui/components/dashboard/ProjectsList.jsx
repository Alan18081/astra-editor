import React from 'react';

import Project from './Project';

export default ({projects}) => (
  <div>
    {projects.map(channel => (
      <Project key={channel._id} project={channel}/>
    ))}
  </div>
);