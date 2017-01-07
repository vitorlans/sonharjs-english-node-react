import jwt from 'jsonwebtoken';

export default(req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    let token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }

    if (token) {

        // decode token
        if (token) {
            // verifies secret and checks exp
            try {
                let decoded = jwt.verify(token, 'superSecret');
                req.currentUser = decoded;
                next();
            } catch (err) {
                res
                    .status(401)
                    .json({error: 'Failed to authenticate'});
            }

        } else {
            res
                .status(403)
                .json({error: 'No token provided'});
        }
    }

};