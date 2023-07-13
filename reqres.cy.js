

describe('empty spec', () => {
  

  it('GET-list user',()=>{
    cy.request('GET','https://reqres.in/api/users?page=2').then((response)=>{
        expect(response.status).equal(200)
        expect(response.body.data[0].first_name).equal('Michael')
        expect(response.body).to.not.be.null
        expect(response.body.data).to.have.length(6)
    })
  })

  it('GET-list a single user',()=>{
    cy.request('GET','https://reqres.in/api/users/2').then((response)=>{
        expect(response.status).equal(200)
       
        expect(response.body).to.not.be.null
        //expect(response.body.data).to.have.length(6)
    })
  })

  it('GET-List resources',()=>{
    cy.request('GET','https://reqres.in/api/unknown').then((response)=>{
       expect(response.status).equal(200)
       expect(response.body).to.not.be.null
        //expect(response.body.data).to.have.length(6)
    })
  })

  it('GET-List single resources',()=>{
    cy.request('GET','https://reqres.in/api/unknown/2').then((response)=>{
       expect(response.status).equal(200)
       expect(response.body).to.not.be.null
       
    })
  })

  it('POST /api/users', () => {
    const user = {
      name: 'John Doe',
      job: 'Software Engineer'
    }
    cy.request('POST', 'https://reqres.in/api/users', user)
      .then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body.name).to.eq(user.name)
        expect(response.body.job).to.eq(user.job)
      })
  })

  it('PUT - Ùpdate user',()=>{
    var user1 = {
        "name": "morpheus",
        "job": "zion resident"
    }

    cy.request('PUT','https://reqres.in/api/users/2',user1  ).then((response)=>{
        expect(response.status).equal(200)
       expect(response.body.name).equal(user1.name)
        expect(response.body.job).equal(user1.job)
    })
    })

    it('Delete user',()=>{
      var user1 = {
          "name": "Janet",
          
      }

      cy.request('DELETE','https://reqres.in/api/users/2').then((response)=>{
          expect(response.status).equal(204)

      })
  })
 
  it('POST /api/register - Register a new user', () => {
    const user = {
      email: "eve.holt@reqres.in",
    password: "pistol"
    };
    cy.request('POST', 'https://reqres.in/api/register', user)
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');
      });
  });


  it('POST /api/register - Unsuccessful registration with incomplete data', () => {
    const user = {
      email: "sydney@fife"
    };

    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/register',
      body: user,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal('Missing password');
    });

  });

  it('POST /api/login - Successful login', () => {
    const user = {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    };

    cy.request('POST', 'https://reqres.in/api/login', user)
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');
      });
  });

  it('POST /api/login - Unsuccessful login with incorrect password', () => {
    const user = {
      email: "peter@klaven"
    };

    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/login',
      body: user,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal('Missing password');
    });


  });

  it('GET /api/users?delay=3 - Returns users after a 3-second delay', () => {

    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users?delay=3'
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.data).to.have.length(6);
    });
  });


})