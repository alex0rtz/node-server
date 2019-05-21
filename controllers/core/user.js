exports.get = (req, res) => {
    const users = [{name: 'ALEX', lastname: 'ORTIZ', id: 'dkfafmxlamdfla'}]

    res.json({
        result: true,
        users,
        counts: users.length
    });
};

exports.post = (req, res) => { };

exports.put = (req, res) => { };

exports.delete = (req, res) => { };