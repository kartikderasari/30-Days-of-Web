fetch('data.json')
    .then((res) => res.json())
    .then((data) => { showData(data) })

function showData(data) {
    document.getElementById('title').innerHTML = data.name;
    document.getElementById('name').innerHTML = data.name;
    document.getElementById('designation').innerHTML = data.designation;
    document.getElementById('bio').innerHTML = data.bio;
    document.getElementById('whatIDo').innerHTML = data.whatIDo;
    document.getElementById('resumeURL').href = data.resumeURL;
    document.getElementById('profileImage').src = data.profileImageURL;
    document.getElementById('secondaryImage').src = data.secondaryImageURL;
    data.skills.forEach(
        (skill) => {
            document.getElementById('skillrow').innerHTML +=
                `
                <span class="badge bg-secondary skill-badges">${skill}</span>
        `;
        }
    )
    data.communities.forEach(
        (community) => {
            document.getElementById('community-container').innerHTML +=
                `
                <div class="community-card row">
                <div class="col-lg-4 col-md-12 col-sm-12">
                  <img src="${community.commImageURL}" alt="" class="community-image rounded-circle">
                </div>
                <div class="col-lg-8 col-md-12 col-sm-12">
                  <a href="${community.commURL}" target="_blank"><h4>${community.commName}</h4></a>
                  <p>Community Lead</p>
                </div>
              </div>
        `;
        }
    )

    let showpills = (arr) => {
        let pills = '';
        arr.forEach(
            (ele) => {
                console.log(ele);
                pills +=
                    `<span class="badge bg-secondary skill-badges">${ele}</span>`;
            }
        )
        return pills;
    }

    data.projects.forEach(
        (project) => {
            document.getElementById('project-container').innerHTML +=
                `
            <div class="project-card">
              <h4>${project.projectName}</h4>
              <p>${project.projectDesc}</p>
              <p>${showpills(project.techStack)}</p>
              <a href="${project.projectURL}" target="_blank" class="btn btn-primary">Visit here</a>
            </div>
        `;
        }
    )
    document.getElementById('mail').href = `mailto:${data.email}`;
    document.getElementById('facebook').href = data.facebook;
    document.getElementById('instagram').href = data.instagram;
    document.getElementById('linkedin').href = data.linkedin;
    document.getElementById('twitter').href = data.twitter;
}
