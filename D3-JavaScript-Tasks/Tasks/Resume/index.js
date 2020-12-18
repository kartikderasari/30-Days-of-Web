const userData = {

    name: 'Kartik Derasari',

    address: '9B, Raj Colony,<br> Near Naranpura Railway Crossing,<br> Naranpura, Ahmedabad - 380013',

    dob: 'Sep 5 1999',

    socialLinks: [
        {
            urlName: 'Website',
            url: 'https://kartikderasari.me/',
        },
        {
            urlName: 'Facebook',
            url: 'https://www.facebook.com/kartik.derasari.9'
        },
        {
            urlName: 'Instagram',
            url: 'https://www.instagram.com/kartik_derasari/'
        },
        {
            urlName: 'Twitter',
            url: 'https://twitter.com/kartik_derasari'
        },
        {
            urlName: 'LinkedIn',
            url: 'https://www.linkedin.com/in/kartikderasari/'
        },
        {
            urlName: 'GitHub',
            url: 'https://github.com/kartikderasari'
        },
    ],
    education: [
        {
            year: '2017 - Present',
            degree: 'Bachelors of Engineering - Computer',
            institute: 'Silver Oak College of Engg. & Technology, Ahmedabad',
            cgpa: '8.95',
        },
        {
            year: '2015 - 2017',
            degree: 'HSC - GHSEB',
            institute: 'Navkar Public School,',
            cgpa: '8.95',
        },
        {
            year: '2014 - 2015',
            degree: 'SSC - GSEB',
            institute: 'Nirman High School',
            cgpa: '8.95',
        },

    ],
    experience: [
        {
            designation: 'Community Lead – Developer Student Clubs - Google Developers',
            expBrief: 'Managing to launch and lead a university-based community group for students while delivering events on open-source and Google developer technologies to help them build their knowledge while building relationships, and demonstrating technologies with the help of community programs by Google Developer Relations team.'
        },
        {
            designation: 'Chairperson – Silver Oak University IEEE Student Branch',
            expBrief: 'Being the Head of Community, supervised all the community operations while managing and guiding a bunch of team leads, increasing the community presence by 400% and successfully delivering community programs for student developers.'
        },
        {
            designation: 'Industry Relations Manager – IEEE India Council',
            expBrief: 'Achieved a leadership position in a national council of the world’s largest technical professional organization from 719 nominations while enabling community relations with industries to deliver community programs and campaigns at a great scale.'
        },
        {
            designation: 'Organizer – Google Developers Group Cloud Ahmedabad ',
            expBrief: 'Lead a community of Google Cloud professionals, delivered more than 15 community events, discussions, and conferences while setting - up various community programs and initiatives, managing communication and growing the community strength. '
        },
        {
            designation: 'Machine Learning Facilitator – Google AI | Explore ML',
            expBrief: 'Advocated Google AI’s ML-Edu program, demonstrating Machine Learning & TensorFlow to 2000+ student developers while delivering mentorship and more than 10 events independently. While achieving a position on the Wall of Fame of Top contributors, designed and launched an MVP which was invited to receive Mentorship from Google Developer Experts & Google for Start-up Mentors.'
        },
    ],
    certScholarship: [
        'The C2C Event Program Playbook - CMX Academy',
        'The Community MBA - CMX Academy',
        'Define and Establish a Community - Facebook',
        'Secure & Private AI Scholarship - Udacity Facebook',
        'Edge Computing Scholarship - Intel AI'
    ],
    accomplishments: [
        'Three Awards of Achievement - Silver Oak University',
        'Award of Appreciation, Top Contributor - Google AI | Explore ML',
        'Winner - HackNUthon ’19 – Nirma University',
        'Winner - Ingenious Hackathon ’19 – Ahmedabad University',
        'Google Code-In Mentor @TensorFlow',
        'IEEE Collabratec Global Lead Ambassador',
        'Microsoft Learn Student Ambassador',
    ]
};

showData();

function showData() {

    document.getElementById('name').innerHTML = userData.name;
    document.getElementById('address').innerHTML = userData.address;
    document.getElementById('dob').innerHTML += userData.dob;

    for (let i = 0; i < userData.socialLinks.length; i++) {
        document.getElementById('socialLinks').innerHTML += `
            <tr><td><a href="${userData.socialLinks[i].url}">${userData.socialLinks[i].urlName}</a></td></tr>`;
    }

    for (let i = 0; i < userData.education.length; i++) {
        document.getElementById('educationTableBody').innerHTML += `
            <tr>
                <td>${userData.education[i].year}</td>
                <td>${userData.education[i].degree}</td>
                <td>${userData.education[i].institute}</td>
                <td>${userData.education[i].cgpa}</td>
            </tr>`;
    }

    for (let i = 0; i < userData.experience.length; i++) {
        document.getElementById('expContent').innerHTML += `
            <strong>${userData.experience[i].designation}</strong>    
            <p>${userData.experience[i].expBrief}</p>
        `;
    }

    for (let i = 0; i < userData.accomplishments.length; i++) {
        document.getElementById('accomContent').innerHTML += `
            <li> ${userData.accomplishments[i]} </li>`;
    }

    for (let i = 0; i < userData.certScholarship.length; i++) {
        document.getElementById('certContent').innerHTML += `
            <li> ${userData.certScholarship[i]} </li>`;
    }

}