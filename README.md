# English-Dictionary-App

<div id="top"></div>




<!-- PROJECT LOGO -->
</br>
<div style= "text-align:center;cursor: default;">
    <img target="blank" src="https://www.coachingpositiveperformance.com/wp-content/uploads/2015/11/rsz_contextualised-lists.png" alt="Logo" width="80" height="80">
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <ul>
    <li><a href="#assignment">Assignment</a></li>
    <li><a href="#database">Database</a></li>
    <li><a href="#server-requirements">Server Requirements</a></li>
    <li><a href="#client-requirements">Client Requirements</a></li>
    <li><a href="#architecture">Architecture</a></li>
        <li><a href="#built-with">Built With</a></li>
          <ul>
        <li><a href="#ide">IDE</a></li>
        <li><a href="#frameworks-platforms-and-libraries">Frameworks, Platforms and Libraries</a></li>
        <li><a href="#languages">Languages</a></li>
        <li><a href="#databases">Databases</a></li>
        <li><a href="#deployment">Deployment</a></li>
          </ul>        
      </ul>
    </li>
  </ol>
</details>
</br>

<p style= "text-align:right">(<a href="#top">back to top</a>)</p>

## Assignment

#### Your about to build an english-dictionary app.

- Download [English Dictionary in CSV format](https://www.bragitoff.com/2016/03/english-dictionary-in-csv-format/)
- Set up a DynamoDB with `Dictionary` table.

<p style= "text-align:right">(<a href="#top">back to top</a>)</p>

## DATABASE

- Parse & Insert all words, in a common structure, to `Dictionary` table.

<p style= "text-align:right">(<a href="#top">back to top</a>)</p>


## Server Requirements

- Build a REST API with the following end point(s):

* [x] `GET /:word` - if word has more than one parts of speech will return all words part of speech, else, will return a word + definition + part of speech.
* [x] `GET /:word/:partOfSpeech` - will return a word + definition + part of speech [(noun, verb, adjectives, etc...)](https://www.dictionary.com/e/parts-of-speech/) `{updated: true}` if succeed.
* [x] `GET /part-of-speech/:part` - for example, `/part-of-speech/adjective`, will return a random word + definition + part of speech (`part` is enum).

<p style= "text-align:right">(<a href="#top">back to top</a>)</p>

<!-- Running-tests-->

## Client Requirements

- [x] Build a `create-react-app` english dictionary app (mobile first)
- [x] URL routes:
    - `/:word` - dynamic route - `word` is dynamic URL parameter, used to request backend api.
    - `/:word/:partOfSpeech` - dynamic route - `word` is dynamic URL parameter, used to request backend api.
    - `/part-of-speech/:part` - `part` is enum URL parameter, used to request backend api.
    - Each word in dictionary is clickable and will redirect to a common URL.
    - **BONUS** should be deployed to `S3 bucket`.


<p style= "text-align:right">(<a href="#top">back to top</a>)</p>

## Architecture

![Architecture](./images/Dictionary-Architecture.png)


<p style= "text-align:right">(<a href="#top">back to top</a>)</p>

### Built With

- #### IDE

  [![Vscode][vscode-shield]][vscode-url]

- #### Frameworks, Platforms and Libraries
  [![AWS][aws-shield]][aws-url]
  [![React][react-shield]][react-url]
  [![Npm][npm-shield]][npm-url]
  [![Nodejs][nodejs-shield]][nodejs-url]
  [![Express][express-shield]][express-url]
  [![Mui][mui-shield]][mui-url]
  [![Css3][css3-shield]][css3-url]
  [![Bootstrap][bootstrap-shield]][bootstrap-url]

- #### Languages

  [![Html5][html5-shield]][html5-url]
  [![JavaScript][javascript-shield]][javascript-url]

- #### Databases
  [![DynamoDB][dynamoDB-shield]][dynamoDB-url]
  

<p style= "text-align:right">(<a href="#top">back to top</a>)</p>

- #### Deployment
- [x] [DictionaryApp](https://english-dictionary-sagi.s3.us-east-2.amazonaws.com/index.html)   

<p style= "text-align:right">(<a href="#top">back to top</a>)</p>

<!-- Badges -->

<!-- build with -->

<!-- IDE -->

[vscode-url]: https://code.visualstudio.com/
[vscode-shield]: https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white

<!-- Frameworks -->
<!-- Nodejs -->

[nodejs-url]: https://nodejs.org/en/
[nodejs-shield]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=whit

<!-- Npm -->

[npm-url]: https://www.npmjs.com/
[npm-shield]: https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white

<!-- Aws-->

[aws-shield]: https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white
[aws-url]: https://aws.amazon.com/

<!-- Express -->

[express-shield]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[express-url]: https://expressjs.com/

<!--React  -->

[react-shield]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/

<!-- Mui -->

[mui-shield]: https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=material-ui&logoColor=white
[mui-url]: https://mui.com/

<!-- Css3 -->
[css3-shield]: https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
[css3-url]: https://en.wikipedia.org/wiki/CSS

<!-- Bootstrap -->

[bootstrap-shield]: https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white
[bootstrap-url]: https://getbootstrap.com/

<!-- Languages -->

<!-- Html5-->

[html5-url]: https://developer.mozilla.org/en-US/docs/Glossary/HTML5
[html5-shield]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white

<!-- JavaScript -->

[javascript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[javascript-shield]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E

<!-- Databases -->
   <!--AWS-DynamoDB -->
[dynamoDB-shield]: https://img.shields.io/badge/Amazon%20DynamoDB-4053D6?style=for-the-badge&logo=Amazon%20DynamoDB&logoColor=white
[dynamoDB-url]: https://aws.amazon.com/dynamodb/
<!-- Linters -->





