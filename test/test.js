var chai   = require('chai');
var assert = chai.assert,
    expect = chai.expect;

process.env.NODE_ENV = 'test'
var github = require('../index');
const newrepo = "test-345-new19";

// Turn off logging
console.log = function(){};

describe("GitHub EndPoint Tests", function() {

    this.timeout(5000);
    it("listAuthenicatedUserRepos returns repo objects", async function() {
        
        let repos = await github.listAuthenicatedUserRepos();
        expect(repos).to.be.an('array').that.have.nested.property('[1].owner.login');
    });

    it("listBranches returns list branches", async function() {
        
      let user  = await github.getUser();
      let repos = await github.listBranches(user,"345");
//      let repos = await github.listBranches(user,"HW4-345");
      expect(repos).to.be.an('array').that.have.nested.property("[0].name").equals("master");

    });

    it("createRepo successfully creates repo", async function() {
        
      let user  = await github.getUser();
      let status = await github.createRepo(user, newrepo);
      console.log(status);
//      let status = await github.createRepo(user, "test-HW4-345");
      expect(status).to.equal(201);

    });


    it("createIssue successfully creates issue", async function() {
      
      let user  = await github.getUser();
      let status = await github.createIssue(user, "345", newrepo+"issue created", "issue body");
//      let status = await github.createIssue(user, "HW4-345", "issue name", "issue body");
      expect(status).to.equal(201);

    });

    it("enableWikiSupport successfully enables wiki support", async function() {
      
      let user  = await github.getUser();
      let response = await github.enableWikiSupport(user, "345");

      expect(response.body).to.have.property('has_wiki');
      expect(response.body.has_wiki).to.equal(true);
    });
});


