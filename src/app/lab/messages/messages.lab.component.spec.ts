import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagesComponentForLab } from './messages.lab.component';
import { MessageService } from '../../services/message/message.service';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('2-message component integration testing:', () => {
  let component: MessagesComponentForLab;
  let fixture: ComponentFixture<MessagesComponentForLab>;
  let messageService: MessageService;
  let element: HTMLElement;

  beforeAll(() => {
    TestBed.configureTestingModule({
      imports: [MessagesComponentForLab],
    });
  });

  afterAll(() => {
    fixture.destroy();
  });

  it('expect component template to be empty', () => {
    //Note: there is @if"messageService.messages.length" in line 1 in template
    fixture = TestBed.createComponent(MessagesComponentForLab);
    component = fixture.componentInstance;
    fixture.detectChanges();

    element = fixture.debugElement.nativeElement;
    // console.log(element.querySelector('h2')?.textContent);

    expect(element.querySelector('h2')).toBeNull();
  });

  it('then expect div.msg to have the messages after setting it', () => {
    messageService = TestBed.inject(MessageService);
    messageService.add('first message');
    messageService.add('second message');

    fixture = TestBed.createComponent(MessagesComponentForLab);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // component.ngOnChange();

    const elements = fixture.debugElement.queryAll(By.css('div.msg'));
    expect(elements.length).toEqual(2);
    expect(elements[0].nativeElement.textContent).toContain('first message');
    expect(elements[1].nativeElement.textContent).toContain('second message');
  });
});
