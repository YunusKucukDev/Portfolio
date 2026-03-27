import { Timeline } from "../components/Timeline";
import { useEffect } from 'react';
import { useAppDispacth, useAppSelector } from "../Store/store";
import { fetchExperinces, selectAllExperiences } from "../Slices/ExperienceSlice";

const Experiences = () => {

  const dispatch = useAppDispacth();
  const experiences = useAppSelector(selectAllExperiences);

   useEffect(() => {
      dispatch(fetchExperinces());
    }, [dispatch]);


  return (
    <div id="experiences" className="w-full">
      <Timeline data={experiences} />
    </div>
  );
};

export default Experiences;
