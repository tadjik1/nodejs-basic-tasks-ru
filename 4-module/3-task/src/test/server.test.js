const server = require('../server');
const request = require('request');
const expect = require('chai').expect;
const fse = require('fs-extra');
const path = require('path');

const filesFolder = path.resolve(__dirname, '../files');
const fixturesFolder = path.resolve(__dirname, './fixtures');

describe('4-module-1-task', () => {
  describe('тесты на файловый сервер', () => {
    before((done) => {
      fse.emptyDirSync(filesFolder);
      server.listen(3001, () => done());
    });
    after((done) => {
      fse.emptyDirSync(filesFolder);
      fse.writeFileSync(path.join(filesFolder, '.gitkeep'), '');
      server.close(done);
    });

    beforeEach(() => {
      fse.emptyDirSync(filesFolder);
    });

    describe('DELETE', () => {
      it('файл должен удаляться', (done) => {
        fse.copyFileSync(
            path.join(fixturesFolder, 'small.png'),
            path.join(filesFolder, 'small.png'),
        );

        request.delete('http://localhost:3001/small.png', (error, response, body) => {
          if (error) return done(error);

          expect(response.statusCode).to.equal(200);
          expect(fse.existsSync(path.join(filesFolder, 'small.png'))).to.be.false;

          done();
        });
      });

      it('если файла нет - ошибка 404', (done) => {
        request.delete('http://localhost:3001/small.png', (error, response, body) => {
          if (error) return done(error);

          expect(response.statusCode).to.equal(404);
          done();
        });
      });
    });
  });
});
