import { AfterViewInit, Component, Input, OnInit, Renderer2 } from '@angular/core';

import { PostService } from '../posts/posts.service';
import { Post } from '../posts/post.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface StreakPost {
  mediaId: string;
  photoUrl: string;
  streak: number;
}

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent implements OnInit {

  @Input() posts: StreakPost[] = [];
  topStreaks: StreakPost[] = [];
  selectedIcon: string | null = null;
  selectedSymbol: string | null = 'assets/red-heart-icon.svg';
  iconString: string = "Likes";

  showForm: boolean = false;
  showSlids: boolean = false;
  slideshowForm: FormGroup;

  topPost: Post = {
    mediaId: '',
    likes: 0,
    photoUrl: '',
    content: '',
    timestamp: '',
    mediaType: ''
  };
selectedPlatform: any;

  constructor(private postService: PostService, private renderer: Renderer2, private fb: FormBuilder) {
    this.slideshowForm = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.postService.getTopPost().subscribe(data => {
      debugger
      this.topPost = data
      this.selectIcon(data.mediaType);
    });
  }
  initializeSlider() {
    const slider = document.getElementById('coverflowSlider');
    const items = document.querySelectorAll('.slider-item');
    const totalItems = items.length;
    const itemHeight = 220; // Including margin
  
    // Check if the slider element exists
    if (slider) {
      // Calculate the total height needed to animate
      const totalHeight = itemHeight * totalItems;
  
      // Inject dynamic keyframes using the Renderer2 service
      const animationName = 'autoSlide';
      const styleElement = this.renderer.createElement('style');
      styleElement.innerHTML = `
        @keyframes ${animationName} {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-${totalHeight}px);
          }
        }
      `;
      this.renderer.appendChild(document.head, styleElement);
  
      // Apply animation to the slider
      slider.style.animation = `${animationName} ${totalItems * 5}s infinite linear`;
    } 
  
    if (slider && items.length > 0) {
      let currentIndex = 1;
      const totalItemsss = items.length;
  
      const updateCenteredImage = () => {
        // Remove 'centered' class from all images inside slider-items
        items.forEach(item => {
          const img = item.querySelector('img');
          if (img) {
            img.classList.remove('centered');
          }
        });
  
        // Add 'centered' class to the img of the current slider-item
        const currentItem = items[currentIndex];
        const currentImg = currentItem.querySelector('img');
        if (currentImg) {
          currentImg.classList.add('centered');
        }
  
        // Increment the index for the next image, looping back if needed
        currentIndex = (currentIndex + 1) % totalItemsss;
      };
  
      // Initial centered image
      updateCenteredImage();
  
      // Update the centered image every 3 seconds (adjust timing as per your animation)
      setInterval(updateCenteredImage, 5000); // Adjust timing to match your animation speed
    }
  }
  

  toggleForm() {
    this.showForm = !this.showForm;
    this.showSlids = false; // hide slider when toggling the form
  }

  onSave() {
    if (this.slideshowForm.valid) {
      this.showForm = false;
      this.showSlids = true; // show slider when form is saved
      setTimeout(() => {
        this.initializeSlider();
      }, 0);
    }
  }
  // Method to select an icon and update the button
  selectIcon(platform: string) {
    const iconMap: { [key: string]: string } = {
      Instagram: 'assets/instagram.svg',
      Twitter: 'assets/twitter.svg',
      Snapchat: 'assets/snapchat.svg',
      Whatsapp: 'assets/whatsapp.svg',
    };
    const sybolMap: { [key: string]: string } = {
      Instagram: 'assets/red-heart-icon.svg',
      Twitter: 'assets/blue-heart.svg',
      Snapchat: 'assets/fire.svg',
      Whatsapp: 'assets/eye.svg',
    };

    const stringMap: { [key: string]: string } = {
      Instagram: 'Likes',
      Twitter: 'Comments',
      Snapchat: 'Streaks',
      Whatsapp: 'Views',
    };

    const platformClassMap: { [key: string]: string } = {
      Instagram: 'instagram',
      Twitter: 'twitter',
      Snapchat: 'snapchat',
      Whatsapp: 'whatsapp',
    };
    this.selectedIcon = iconMap[platform];
    this.selectedSymbol = sybolMap[platform];
    this.iconString = stringMap[platform];
    this.selectedPlatform = platformClassMap[platform];
    console.log(`Selected platform: ${platform}`);
  }
}
