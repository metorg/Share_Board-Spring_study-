package com.metrog.metrog.service;

import com.metrog.metrog.model.Post;
import com.metrog.metrog.model.PostRequestDto;
import com.metrog.metrog.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;

    @Transactional
    public Long update(Long id, PostRequestDto requestDto) {
        Post post = postRepository.findById(id).orElseThrow(
                () -> new NullPointerException("해당 아이디가 존재하지 않습니다.")
        );
        post.update(requestDto);
        return id;
    }

}
