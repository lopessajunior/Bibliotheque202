function createClient(nom, prenom, email, password) {
    return {
        nom: nom,
        prenom: prenom,
        email: email,
        password: password
    };
}

export default createClient;