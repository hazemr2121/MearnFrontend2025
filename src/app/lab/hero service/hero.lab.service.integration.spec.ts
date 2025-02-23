import { of } from 'rxjs';
import { HeroServiceForLab } from './hero.lab.service';
import { Hero } from '../../hero';

describe('3-hero service (http) integration testing:', () => {
  let httpMock: any;
  let heroService: HeroServiceForLab;
  let heroesMock: Hero[];
  let updatedHero: Hero;

  beforeAll(() => {
    httpMock = jasmine.createSpyObj(['get', 'put']);
    heroService = new HeroServiceForLab(httpMock);
    heroesMock = [
      { id: 1, name: 'Hawkeye', strength: 100 },
      { id: 2, name: 'Iroh', strength: 200 },
      { id: 420, name: 'Snopp-dog', strength: 420 },
    ];
    httpMock.get.and.returnValue(of(heroesMock));

    updatedHero = { id: 1, name: 'Hawkeye', strength: 150 };
    httpMock.put.and.returnValue(of(updatedHero));
  });

  it('getHeroes function: send request and receive response successfully', () => {
    heroService.getHeroes().subscribe((heroes) => {
      expect(heroes).toEqual(heroesMock);
    });
  });

  it('updateHero function: send request and receive response successfully', () => {
    heroService.updateHero(updatedHero).subscribe((response) => {
      expect(response).toEqual(updatedHero);
    });
  });
});
