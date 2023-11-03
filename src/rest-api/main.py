# from tornado.wsgi import WSGIContainer
# from tornado.httpserver import HTTPServer
# from tornado.ioloop import IOLoop

from flask_app import app
from controllers import input_controller
from controllers import face_controller

if __name__ == '__main__':
    # Execute when the module is not initialized from an import statement.
    app.run(host='0.0.0.0', port=5050)
    # http_server = HTTPServer(WSGIContainer(app))
    # http_server.listen(5000, '0.0.0.0')
    # IOLoop.instance().start()