package com.metrog.metrog.controller;


import com.metrog.metrog.model.Post;
import com.metrog.metrog.repository.PostRepository;
import com.metrog.metrog.model.PostRequestDto;
import com.metrog.metrog.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RestController

public class PostRestController {

    private final PostService postService;
    private final PostRepository postRepository;

    @PostMapping("/api/posts")
    public Post createPost(@RequestBody PostRequestDto requestDto){
        Post post = new Post(requestDto);
        return postRepository.save(post);
    }
    @GetMapping("/api/posts")
    public List<Post> readPost(){
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime yesterday = LocalDateTime.now().minusDays(1);
        return postRepository.findAllByModifiedAtBetweenOrderByModifiedAtDesc(yesterday,now);
    }
    @DeleteMapping("/api/posts/{id}")
    public Long deletePost(@PathVariable Long id){
        postRepository.deleteById(id);
        return id;
    }
    @GetMapping("/api/detail/{id}")
    public Post getDetail(@PathVariable Long id)
    {
        Post post = postRepository.findById(id).orElseThrow(
                () -> new NullPointerException("해당 아이디가 존재하지 않습니다.")
        );
        return post;
    }

}
