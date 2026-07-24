
const allJobPortalBtn = document.getElementById('allJobPortal');
const interviewPortalBtn = document.getElementById('interviewPortal');
const rejectedPortalBtn = document.getElementById('rejectedPortal');

const jobList = document.getElementById("joblist");
const interviewSection = document.getElementById('interviewSection');
const rejectionSection = document.getElementById('rejectionSection');

const totalJob = document.getElementById("totalJob");
const showInterview = document.getElementById("showInterview");
const showReject = document.getElementById("showReject");
const showAvailableJobs = document.getElementById("showAvailableJobs");


allJobPortalBtn.addEventListener('click', function () {
    jobList.classList.remove('hidden');
    interviewSection.classList.add('hidden');
    rejectionSection.classList.add('hidden');
});

interviewPortalBtn.addEventListener('click', function () {
    jobList.classList.add('hidden');
    interviewSection.classList.remove('hidden');
    rejectionSection.classList.add('hidden');
});

rejectedPortalBtn.addEventListener('click', function () {
    jobList.classList.add('hidden');
    interviewSection.classList.add('hidden');
    rejectionSection.classList.remove('hidden');
});



function getTotal() {
    return parseInt(totalJob.innerHTML);
}


function refreshJobs(){
    showAvailableJobs.innerHTML = `${getTotal()} Jobs`;
    AvailableInterviewJobs.innerHTML = `${parseInt(showInterview.innerHTML)} of ${getTotal()} jobs`;
    AvailableRejectedJobs.innerHTML = `${parseInt(showReject.innerHTML)} of ${getTotal()} jobs`;
}

function findCardById(section, jobId) {                                 //.job-card[] -> dataset)
    return section.querySelector(`.job-card[data-job-id="${jobId}"]`);   //return null or <class="job-card" data-job-id="1 or something">
}                                                 // when null?- jokhon oi card ta section(interview/rejected) e thakbena.



function createSectionCard(originalCard) {
    return originalCard.cloneNode(true);
}



function moveJobStatus(jobId, target) {
   
    const original = findCardById(jobList, jobId);

    const status = original.querySelector('.notApplied');
    const currentStatus = status.innerHTML; 

  
    // clicked on interview button
    if(target === 'interview') {
        
        if(currentStatus === 'Interview') return; 

        if(currentStatus === 'Rejected') {
            const oldClone = findCardById(rejectionSection, jobId);
            if(oldClone) oldClone.remove();
            showReject.innerHTML = parseInt(showReject.innerHTML) - 1;
        }
     
        status.innerHTML = "Interview";
        status.classList.remove('bg-blue-200', 'bg-red-300');
        status.classList.add('bg-green-300', 'text-black');

        const createClone  = createSectionCard(original)
        interviewSection.appendChild(createClone);
        showInterview.innerHTML = parseInt(showInterview.innerHTML) + 1;
    } 
    

    //clicked on reject button
    else if(target === 'reject') {

        if(currentStatus === 'Rejected') return;

        if(currentStatus === 'Interview') {
            const oldClone = findCardById(interviewSection, jobId);
            if(oldClone) oldClone.remove();
            showInterview.innerHTML = parseInt(showInterview.innerHTML)-1;
        }

        status.innerHTML = "Rejected";
        status.classList.remove('bg-blue-200', 'bg-green-300');
        status.classList.add('bg-red-300', 'text-black');

        rejectionSection.appendChild(createSectionCard(original));
        showReject.innerHTML = parseInt(showReject.innerHTML) + 1;
    }

    refreshJobs();
}





allJobPortalBtn.addEventListener('click', function () {
    allJobPortalBtn.classList.add('bg-blue-600', 'text-black');
    interviewPortalBtn.classList.remove('bg-blue-600');
    rejectedPortalBtn.classList.remove('bg-blue-600');

});

interviewPortalBtn.addEventListener('click', function () {
    allJobPortalBtn.classList.remove('bg-blue-600');
    interviewPortalBtn.classList.add('bg-blue-600', 'text-black');
    rejectedPortalBtn.classList.remove('bg-blue-600');

    refreshJobs();

});

rejectedPortalBtn.addEventListener('click', function () {
    allJobPortalBtn.classList.remove('bg-blue-600');
    interviewPortalBtn.classList.remove('bg-blue-600');
    rejectedPortalBtn.classList.add('bg-blue-600', 'text-black');

    refreshJobs();
});






//  joblist: 

jobList.addEventListener('click', function (event) {


    allJobPortalBtn.classList.add('bg-blue-600', 'text-black');
    interviewPortalBtn.classList.remove('bg-blue-600');
    rejectedPortalBtn.classList.remove('bg-blue-600');

    const jobcard = event.target.closest('.job-card');
    if(!jobcard) return;
    const jobId = jobcard.dataset.jobId;             //job-id(html) ->  jobId(js)


    // Delete: remove the job entirely, in any section
    if(event.target.closest('.delete-btn')) {
        jobcard.remove();                        

        // delete from interview 
        const interviewClone = findCardById(interviewSection, jobId);                                                  
        if(interviewClone) {                            
            interviewClone.remove();
            showInterview.innerHTML = parseInt(showInterview.innerHTML) - 1;
        }

        // delete form rejection
        const rejectClone = findCardById(rejectionSection, jobId);
        if(rejectClone) {
            rejectClone.remove();
            showReject.innerHTML = parseInt(showReject.innerHTML) - 1;
        }

        totalJob.innerHTML = getTotal()-1;
        refreshJobs();
        return;
    }


    if(event.target.closest('.clickCardInterview')) {
        moveJobStatus(jobId, 'interview');
        return;
    }

    if(event.target.closest('.clickCardReject')) {
        moveJobStatus(jobId, 'reject');
        return;
    }

});





interviewSection.addEventListener('click', function(event) {


    allJobPortalBtn.classList.remove('bg-blue-600');
    interviewPortalBtn.classList.add('bg-blue-600');
    rejectedPortalBtn.classList.remove('bg-blue-600');


    const jobcard = event.target.closest('.job-card');
    if(!jobcard) return;
    const jobId = jobcard.dataset.jobId;


    if(event.target.closest('.delete-btn')) {
       
        jobcard.remove();
        showInterview.innerHTML = parseInt(showInterview.innerHTML)-1;

         const original = findCardById(jobList, jobId);
         if (!original) return;
         const status = original.querySelector('.notApplied');
         status.innerHTML = "NOT APPLIED";
         status.classList.remove('bg-green-300', 'bg-red-300', 'text-black');
         status.classList.add('bg-blue-200');
         refreshJobs();
         return;
    }


    if(event.target.closest('.clickCardReject')) {
        moveJobStatus(jobId, 'reject');
        return;
    }

    if(event.target.closest('.clickCardInterview')) {
        moveJobStatus(jobId, 'interview');
        return;
    }
}); 
  
      




rejectionSection.addEventListener('click', function (event) {

    const jobcard = event.target.closest('.job-card');
    if(!jobcard) return;
    const jobId = jobcard.dataset.jobId;


    if(event.target.closest('.delete-btn')) {

        jobcard.remove();
        showReject.innerHTML = parseInt(showReject.innerHTML)-1;

         const original = findCardById(jobList, jobId);
         if (!original) return;
         const status = original.querySelector('.notApplied');
         status.innerHTML = "NOT APPLIED";
         status.classList.remove('bg-green-300', 'bg-red-300', 'text-black');
         status.classList.add('bg-blue-200');
         refreshJobs();
         return;
    }

    if(event.target.closest('.clickCardInterview')) {
        moveJobStatus(jobId, 'interview');
        return;
    }

    if(event.target.closest('.clickCardReject')) {
        moveJobStatus(jobId, 'reject');
        return;
    }
});

