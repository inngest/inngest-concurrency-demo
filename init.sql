create table jobs (
  id serial primary key,
  user_slug varchar(64) not null,
  event_id varchar(32),
  run_id varchar(32),
  status varchar(32) not null
);

-- begin;

-- -- remove the supabase_realtime publication
-- drop
--   publication if exists supabase_realtime;

-- -- re-create the supabase_realtime publication with no tables
-- create publication supabase_realtime;

-- commit;

-- -- add a 'jobs' table to the publication
-- alter
--   publication supabase_realtime add table jobs;
