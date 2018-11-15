import '../styles/index.scss';
import data from './data';

const static_url = 'public';

const parser = document.createElement('a');

let baseArrow = 0;

// map what icon to use on links
const iconLinks = {
    facebook: 'facebook-official',
    behance: 'behance',
    instagram: 'instagram',
    website: 'globe',
    vimeo: 'vimeo-square'
};

const detectIcon = (links) => {
    // remove the name from the url then map to the matching iconLink
    let r = /^(?:https?:)?(?:\/\/)?([^\/\?]+)/;
    for(let link of links) {
        parser.href = link;
        console.log(parser.hostname);
    }
    return '';
};

// Detect change on vertical scroll then apply rotate style on stamp
window.onscroll = (ev) => {
    let theta = window.scrollY / 10 % Math.PI;
    baseArrow += window.scrollY/ 10 % 4;
    document.querySelector('.stamp').style.transform = `rotate(${theta}rad)`;
    document.querySelector('.arrows').style.transform = `translateY(${baseArrow}px)`;
};

// Generates modal template on each speakers
function generateModal(speaker){
    const name = speaker.slice(1,speaker.length);
    const user = data.find(item => item.id === name.toLowerCase());

    const baseTemplate = `<div class="modal fade" id="${name}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-body">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
            <div class="row">
                <div class="col-lg-6 modal-left modal-content">
                        <div class="speaker-header row">
                            <div class="col-4 speaker-avatar">
                                <img src="${static_url}/images/${user.id}.jpg" class="img-fluid rounded-circle" />
                            </div>
                            <div class="col-8 speaker-info">
                                <h2 class="speaker-name">${user.name}</h2>
                                <h3 class="speaker-company">${user.company}</h3>
                                <h3 class="speaker-place">${user.place}</h3>
                            </div>
                        </div>
                    <p class="speaker-description"> ${user.description} </p>
                    <ul class="speaker-medias list-inline">
                        <li class="list-inline-item"> <a class="soc-facebook" title="Facebook"></a></li>
                        <li class="list-inline-item"> <a class="fa fa-facebook"></a> tw</li>
                        <li class="list-inline-item"> <a class="fa fa-facebook"></a> ig</li>
                    </ul>
                </div>
                <div class="col-lg-6 modal-right modal-portfolio">
                    <div class="row no-gutters">
                        <div class="col-12">
                        <img src="${static_url}/images/${user.id}/1.jpg" class="img-fluid" />
                        </div>
                    </div>
                    <div class="row no-gutters">
                        <div class="col-6">
                        <img src="${static_url}/images/${user.id}/2.jpg" class="img-fluid" />
                        </div>
                        <div class="col-6">
                        <img src="${static_url}/images/${user.id}/3.jpg" class="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
          
        </div>
       
      </div>
    </div>
  </div>`;
    detectIcon(user.socials);
    let e = document.createElement('div');
    e.innerHTML = baseTemplate;
    let speakerModal = document.querySelector('#speaker-modal');
    speakerModal.appendChild(e);
}

// Trigger when DOM is loaded
document.addEventListener("DOMContentLoaded",function(){
    const speakers = document.querySelectorAll('.diamonds-item');
    for (let speaker of speakers) {
        if (speaker.dataset.target) {
            generateModal(speaker.dataset.target);
        }
        speaker.addEventListener('click', (e) => {
            e.preventDefault();
        });
    }
});
