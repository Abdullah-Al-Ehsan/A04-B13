
const allJobPortalBtn = document.getElementById('allJobPortal');
const interviewPortalBtn = document.getElementById('interviewPortal');
const rejectedPortalBtn = document.getElementById('rejectedPortal');

const jobList = document.getElementById("joblist");
const interviewSection = document.getElementById('interviewSection');
const rejectionSection = document.getElementById('rejectionSection');

const totalJob = document.getElementById("totalJob");
const showInterview = document.getElementById("showInterview");
const showReject = document.getElementById("showReject");
const showJobs = document.getElementById("showJobs");



const notApplied = document.getElementsByClassName('notApplied');
const clickCardInterview = document.getElementsByClassName('clickCardInterview');
const clickCardReject = document.getElementsByClassName('clickCardReject');




allJobPortalBtn.addEventListener('click', function(event){
    jobList.classList.remove('hidden');
    interviewSection.classList.add('hidden');
    rejectionSection.classList.add('hidden');
})

interviewPortalBtn.addEventListener('click', function(event){
    jobList.classList.add('hidden');
    interviewSection.classList.remove('hidden');
    rejectionSection.classList.add('hidden');
})

rejectedPortalBtn.addEventListener('click', function(event){
    jobList.classList.add('hidden');
    interviewSection.classList.add('hidden');
    rejectionSection.classList.remove('hidden');
})



// handle delete , interview and reject for all cards using event deligation

jobList.addEventListener('click', function(event){


    const deleteBtn = event.target.closest('.delete-btn');
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



    // Interview button inside card

    const cardInterviewBtn = event.target.closest('.clickCardInterview');
    if(cardInterviewBtn){
        const jobcard = cardInterviewBtn.closest('.job-card');
        const status = jobcard.querySelector('.notApplied');
        status.innerHTML = "Interview";
        status.classList.remove( 'bg-blue-200', 'bg-red-300');
        status.classList.add( 'bg-green-300', 'text-black');

        interviewSection.appendChild(jobcard);     // this jobcard (specific click hoyeche jetate), append in interview section
                                                   // and remove from here
        let interviewCount= parseInt(showInterview.innerHTML);
        interviewCount += 1;
        showInterview.innerHTML = interviewCount;

        let availableTotalJob = parseInt(totalJob.innerHTML);
        let availableshowJobs = parseInt(showJobs.innerHTML[0]);
        totalJob.innerHTML = availableTotalJob - 1;
        showJobs.innerHTML = `${availableshowJobs - 1} Jobs`;
    }









    // Reject button inside card

     const cardRejectBtn = event.target.closest('.clickCardReject');
    if(cardRejectBtn){
        const jobcard = cardRejectBtn.closest('.job-card');
        const status = jobcard.querySelector('.notApplied');
        status.innerHTML = "Rejected";
        status.classList.remove( 'bg-blue-200');
        status.classList.add( 'bg-red-300', 'text-black');


        rejectionSection.appendChild(jobcard);
          
        let rejectionCount= parseInt(showReject.innerHTML);
        rejectionCount += 1;
        showReject.innerHTML = rejectionCount;

        let availableTotalJob = parseInt(totalJob.innerHTML);
        let availableshowJobs = parseInt(showJobs.innerHTML[0]);
        totalJob.innerHTML = availableTotalJob - 1;
        showJobs.innerHTML = `${availableshowJobs - 1} Jobs`;

    }

})
