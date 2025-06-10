import { NextResponse } from "next/server"

export async function GET() {
  try {
    // CV content matching your original file exactly
    const cvHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Nikola Dziwusz - CV</title>
    <style>
        @page {
            margin: 0.75in;
            size: A4;
        }
        body {
            font-family: 'Calibri', 'Arial', sans-serif;
            line-height: 1.4;
            color: #000;
            margin: 0;
            padding: 0;
            font-size: 11pt;
        }
        .header {
            text-align: left;
            margin-bottom: 20px;
        }
        .header h1 {
            font-size: 18pt;
            margin: 0 0 5px 0;
            color: #000;
            font-weight: bold;
            text-transform: uppercase;
        }
        .contact-info {
            font-size: 10pt;
            color: #000;
            margin-bottom: 15px;
        }
        .contact-info div {
            margin: 2px 0;
        }
        .section {
            margin-bottom: 18px;
        }
        .section h2 {
            color: #000;
            font-size: 12pt;
            font-weight: bold;
            margin: 0 0 8px 0;
            text-transform: uppercase;
        }
        .education-section {
            margin-bottom: 15px;
        }
        .education-title {
            font-weight: bold;
            font-size: 11pt;
        }
        .education-details {
            font-size: 10pt;
            margin: 2px 0;
        }
        .about-text {
            text-align: justify;
            font-size: 10pt;
            line-height: 1.4;
            margin-bottom: 15px;
        }
        .experience-item {
            margin-bottom: 15px;
        }
        .job-header {
            margin-bottom: 5px;
        }
        .company-location {
            font-weight: bold;
            font-size: 11pt;
        }
        .period {
            font-size: 10pt;
            margin: 2px 0;
        }
        .job-title {
            font-weight: bold;
            font-size: 11pt;
            margin: 2px 0;
        }
        .description {
            text-align: justify;
            font-size: 10pt;
            line-height: 1.3;
            margin-top: 5px;
        }
        .skills-section {
            font-size: 10pt;
        }
        .skill-level {
            margin-bottom: 8px;
        }
        .skill-level-title {
            font-weight: bold;
            margin-bottom: 3px;
        }
        .gdpr-text {
            margin-top: 20px;
            font-size: 8pt;
            color: #000;
            text-align: justify;
            line-height: 1.2;
        }
        .courses-list {
            font-size: 10pt;
            line-height: 1.3;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>NIKOLA DZIWUSZ</h1>
        <div class="contact-info">
            <div>nikoladziwusz@gmail.com</div>
            <div>+48 780 086 502</div>
            <div>LinkedIn</div>
        </div>
    </div>

    <div class="section">
        <h2>ABOUT ME</h2>
        <div class="about-text">
            I am a business psychology graduate with a strong background in social and cognitive psychology, passionate about understanding human behavior. Over the past two years, I have been working in web development, where I combine my analytical skills with a creative approach to problem-solving. I am eager to continue growing my expertise in web development and IT, leveraging my knowledge of psychology to create user-centric solutions. In addition to my professional pursuits, I am deeply interested in music, from singing to production, which enriches my creative perspective.
        </div>
    </div>

    <div class="section">
        <h2>EDUCATION</h2>
        <div class="education-section">
            <div class="education-title">Master's degree, Business psychology, 2018 – 2023</div>
            <div class="education-details">SWPS University of Humanities and Social Sciences, Department of Psychology in Wrocław</div>
        </div>
    </div>

    <div class="section">
        <h2>SKILLS</h2>
        <div class="skills-section">
            <div class="skill-level">
                <div class="skill-level-title">Technical Skills:</div>
            </div>
            <div class="skill-level">
                <div class="skill-level-title">Advanced level:</div>
                <div>HTML/CSS</div>
            </div>
            <div class="skill-level">
                <div class="skill-level-title">Intermediate level:</div>
                <div>JavaScript/TypeScript, Git, ReactJS, GraphQL, NestJS, TypeORM, Jira, Vue 3, Nuxt, Node.js</div>
            </div>
            <div class="skill-level">
                <div class="skill-level-title">Basic level:</div>
                <div>Python, PostgreSQL</div>
            </div>
            <div class="skill-level">
                <div class="skill-level-title">Analytical Skills:</div>
            </div>
            <div class="skill-level">
                <div class="skill-level-title">Basic level:</div>
                <div>Customer Journey Map Analysis and Creation, Usability Tests: Basic to Intermediate</div>
            </div>
            <div class="skill-level">
                <div class="skill-level-title">Soft Skills:</div>
                <div>Independent and Team Work, Focus on Goals and Task Completion, Openness and Communication, Team Atmosphere and Communication, Flexibility and Time Management, Accuracy, Regularity, Quick Learner,</div>
            </div>
            <div class="skill-level">
                <div class="skill-level-title">Additional:</div>
                <div>English: B2 Level, Driving License: Category B</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>EXPERIENCE</h2>
        
        <div class="experience-item">
            <div class="job-header">
                <div class="company-location">Samsung, Wrocław</div>
                <div class="period">07.2023 – Currently</div>
                <div class="job-title">Full-stack developer</div>
            </div>
            <div class="description">
                I developed and maintained a CMS web application tailored for the team responsible for creating and editing content for the Samsung Global Goals charity application. I collaborated with cross-functional teams, including designers, product managers, and other developers, to deliver high-quality software solutions. Furthermore, I implemented both front-end and back-end features, ensuring seamless integration and user-friendly experiences. Utilizing modern web technologies such as React, Node.js, and MongoDB, I created dynamic and responsive web applications. I conducted code reviews, troubleshooted issues, and optimized application performance to meet the highest standards of efficiency and reliability. I participated in daily stand-ups, sprint planning, and retrospectives as part of the agile methodology to continuously improve development processes and team collaboration. Additionally, I stayed updated with the latest industry trends and technologies to incorporate best practices and innovative solutions into the development process.
            </div>
        </div>

        <div class="experience-item">
            <div class="job-header">
                <div class="company-location">Techland, Wrocław</div>
                <div class="period">07.2021 - 10.2022</div>
                <div class="job-title">UX Researcher</div>
            </div>
            <div class="description">
                Assisting with the execution of playtests, including testing playtested features, managing hardware/software setups, participant intake/outtake, playtest moderation, and note-taking, analyzing survey results, both qualitative and quantitative as well as gameplay videos for valuable insights, Preparing easy-to-read but informationrich reports and presentations.
            </div>
        </div>

        <div class="experience-item">
            <div class="job-header">
                <div class="company-location">BonaSoft, Wrocław</div>
                <div class="period">05.2022 – 10.2022</div>
                <div class="job-title">Front-end developer</div>
            </div>
            <div class="description">
                I qualified for the BonaAkademi program, it is a program that aims to prepare participants for the role of a Front-end developer or Back-end developer depending on the path chosen. The program is divided into two parts. In the first month the theoretical part is conducted - lectures and exercises, while for the remaining two months participants create a project in scrum methodology.
            </div>
        </div>

        <div class="experience-item">
            <div class="job-header">
                <div class="company-location">NOjam</div>
                <div class="period">10.2019 - 03.2020</div>
                <div class="job-title">Creator of the idea</div>
            </div>
            <div class="description">
                During my studies, I also had the opportunity to create a project based on gamification theory. Using knowledge we gained, together with a UX design student, we created an interactive prototype of a mobile application which aim was to encourage people to use all means of public transport, such as: bicycles, scooters, buses and trams in order to eliminate traffic congestion in large cities.
            </div>
        </div>
    </div>

    <div class="section">
        <h2>COURSES AND CERTIFICATES</h2>
        <div class="courses-list">
            Quantitavie Data Analysis Advanced course on Methodology & Statistics<br>
            Advanced front-end (Udemy) Web developer from scratch (Udemy) HTML and CSS from scratch (eduweb) WWW creation from scratch (eduweb)
        </div>
    </div>

    <div class="gdpr-text">
        I agree to the processing of personal data provided in this document for realizing the recruitment process and future recruitment processes pursuant to the Personal Data Protection Act of 10 May 2018 (Journal of Laws 2018, item 1000) and in agreement with Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data, and repealing Directive 95/46/EC (General Data Protection Regulation).
    </div>
</body>
</html>
    `

    const response = new NextResponse(cvHTML, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": 'attachment; filename="Nikola_Dziwusz_CV.html"',
      },
    })

    return response
  } catch (error) {
    console.error("Error generating CV:", error)
    return NextResponse.json({ error: "Failed to generate CV" }, { status: 500 })
  }
}
