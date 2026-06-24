
const totalJob = document.getElementById("totalJob");
const showInterview = document.getElementById("showInterview");
const showReject = document.getElementById("showReject");
const jobList = document.getElementById("joblist");
const showJobs = document.getElementById("showJobs");


jobList.addEventListener('click', function(event){

    deleteBtn = event.target.closest('.delete-btn');
    
    if(deleteBtn){
      const jobcard = deleteBtn.closest('.job-card');
      jobcard.remove();

      let availableTotalJob = parseInt(totalJob.innerHTML);
      let availableshowJobs = parseInt(showJobs.innerHTML[0]);
      availableTotalJob-=1;
      availableshowJobs-=1;
      
      totalJob.innerHTML = availableTotalJob;
      showJobs.innerHTML = `${availableshowJobs} Jobs`;

    }

})

