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
    data.techImageURL.forEach(
        (url) => {
            document.getElementById('techimage').innerHTML +=
                `
            <div class="col-3 col-md-3 col-sm-3">
            <img class="tech-image" src="${url}" alt="">
          </div>
        `;
        }
    )
    data.communities.forEach(
        (community) => {
            document.getElementById('commrow').innerHTML +=
                `
            <div class="content-container col-lg-1 col-md-3 col-sm-2">
                <img class="rounded-circle community-image" src="${community.commImageURL}" alt="" srcset="">
            </div>
            <div class="content-container col-lg-3 col-md-3 col-sm-4">
                <h5 class="comm-name"><a href="${community.commURL}" style="color: "#635353";>${community.commName}</a></h5>
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
