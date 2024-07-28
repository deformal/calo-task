'use client';
import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { JobsApi } from './job/jobs';
import { JOB } from '@calo/types';

export default function Page() {
  const [jobs, setJobs] = useState<JOB[]>([]);
  const [activeImage, setActiveImage] = useState<string>('');
  const [active, setActiveId] = useState<string>('');

  const jobApi = new JobsApi();

  useEffect(() => {
    getJobList();
  }, []);

  useEffect(() => {
    if (jobs && jobs.length > 0) {
      setActiveImage(`${jobApi.url}/${jobs[0].id}`);
      setActiveId(jobs[0].id);
    }
  }, [jobs]);

  const getJobList = async () => {
    const list = await jobApi.getListOfJobs();
    setJobs(list.reverse());
  };

  const onJobIdClick = async (event: BaseSyntheticEvent) => {
    const id = event.target.id;
    const data = await jobApi.geJob(id);
    setActiveImage(data);
    setActiveId(id);
  };

  const addJob = async () => {
    await jobApi.addJob();
    getJobList();
  };

  return (
    <div className="app">
      <div className="new_job">
        <button onClick={addJob} className="new_job_btn">
          Add Job
        </button>
      </div>
      <div className="id_list">
        <h1 className="list_heading">Job Lists</h1>
        <div className="ids">
          {jobs.length <= 0 ? (
            <h1 className="empty_list">Empty list</h1>
          ) : (
            jobs.map((job) => (
              <button
                key={job.id}
                id={job.id}
                className={active === job.id ? 'job_id_active' : 'job_id'}
                onClick={onJobIdClick}
              >
                {job.id}
              </button>
            ))
          )}
        </div>
      </div>
      <div className="img_container">
        <img className="job_img" alt="NOT_RESOLVED" src={activeImage} />
      </div>
    </div>
  );
}
