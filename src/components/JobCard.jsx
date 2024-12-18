import React from 'react';
import styles from './styles';

const JobCard = React.memo(({ job, onDelete, onEdit }) => (
  <div style={styles.jobCard}>
    <h3>{job.title}</h3>
    <p>{job.description}</p>
    <p>{job.location}</p>
    <div>
      <button onClick={onDelete} style={{ ...styles.button, ...styles.deleteButton }}>
        Delete
      </button>
      <button onClick={onEdit} style={{ ...styles.button, ...styles.secondaryButton }}>
        Edit
      </button>
    </div>
  </div>
));

export default JobCard;
