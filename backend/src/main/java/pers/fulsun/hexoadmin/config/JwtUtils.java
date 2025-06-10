package pers.fulsun.hexoadmin.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * token 工具类
 */
@Component
public class JwtUtils {

    /**
     * token有效期 单位：毫秒
     */
    private long jwtTokenValidity;

    /**
     * 签名密钥
     * <p>
     * SecretKey key = Jwts.SIG.HS256.key().build();
     * String base64Key = Encoders.BASE64.encode(key.getEncoded());
     * System.out.println("Generated Key: " + base64Key);
     * </p>
     */
    private String secretKey;

    /**
     * 生成 Base64 编码的 256 位密钥
     *
     * @param args
     */
    public static void main(String[] args) {
        // 生成一个随机的 256 位（32字节）HMAC-SHA 密钥
        SecretKey key = Jwts.SIG.HS256.key().build();
        String base64Key = Encoders.BASE64.encode(key.getEncoded());
        System.out.println("Generated Key: " + base64Key);
    }

    @Value("${jwt.token-validity}")
    public void setJwtTokenValidity(long jwtTokenValidity) {
        this.jwtTokenValidity = jwtTokenValidity;
    }

    @Value("${jwt.secret-key}")
    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    /**
     * 为指定用户生成token
     */
    public String generateToken(String usernId) {
        Map<String, Object> claims = new HashMap<>();
        return doGenerateToken(claims, usernId);
    }

    /**
     * 从token中获取过期时间
     */
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    /**
     * 从token中获取指定声明
     */
    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    /**
     * 验证token是否有效(不检查用户)
     */
    public Boolean validateToken(String token) {
        try {
            getAllClaimsFromToken(token);
            return !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * 从token中获取用户名
     */
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    /**
     * 解析token获取所有声明
     */
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token).getPayload();
    }

    /**
     * 实际生成token的方法
     */
    private String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().claims(claims).subject(subject).issuedAt(new Date(System.currentTimeMillis())).expiration(new Date(System.currentTimeMillis() + jwtTokenValidity)).signWith(getSigningKey()).compact();
    }

    /**
     * 检查token是否过期
     */
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    /**
     * 获取签名密钥
     *
     * @return
     */
    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
